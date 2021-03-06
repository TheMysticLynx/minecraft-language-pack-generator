import React, { createRef } from 'react';
import './App.sass';
import Field from './Field';
import JSZip, { filter } from 'jszip';
import { saveAs } from 'file-saver';
import Sidebar from './components/Sidebar';
import langFile from './en_US.lang';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      filterables: [],
      filters: []
    };

    this.inputFile = createRef();
    this.values = []
  }

  setBase = (text) => {
    let values = text.split('\n')
    values = values.map((value, i) => {
      let v = value.split('=');
      if(v.length == 2) {
        return {
          key: v[0],
          value: v[1],
          index: i
        }
      }
    })

    let filters = [];

    values.forEach(value => {
      if(value != undefined) {
        let s = value.key.split('.');
        if (filters.includes(s[0])) {
          return;
        } else {
          filters.push(s[0]);
        }
      }
    })

    this.values = values

    this.setState({
      filterables: filters 
    })
  }

  componentDidMount() {
    fetch(langFile)
    .then(res => res.text())
    .then(text => {this.setBase(text)})
  }

  generate = () => {
    let zip = new JSZip();
    zip.file('pack.mcmeta', JSON.stringify({
      pack: {
        pack_format: 1,
        description: this.state.description
      }
    }))

    let assets = zip.folder('assets');
    let minecraft = assets.folder('minecraft');
    let lang = minecraft.folder('lang');
    lang.file('en_US.lang', this.values.filter(e => e != undefined).map(e => e.key + '=' + e.value + '\n').join(''));

    zip.generateAsync({type:"blob"})
    .then((blob) => {
      saveAs(blob, `${this.state.name}.zip`);
    });
  }

  importFile = () => {
    this.inputFile.current.click();
  }

  onFileChange = async (e) => {
    let file = this.inputFile.current.files[0];
    let text = await file.text();
    this.setBase(text);
  }

  navbarChange = (e) => {
    if(e.state) {
      this.setState({
        filters: [...this.state.filters, e.value]
      })
    } else {
      this.setState({
        filters: this.state.filters.filter(f => f != e.value)
      })
    }
  }

  render() {
    
    let inputs = this.values.filter(e => {
      if(e != undefined) {
        let s = e.key.split('.');
        if(this.state.filters.includes(s[0])) {
          return true;
        }
      }
    });

    return (
      <div className="App">
        <Sidebar filters={this.state.filterables} onChange={this.navbarChange} generate={this.generate} importFile={this.importFile}/>
        <div className='content'>
          <input type='file' id='file' onChange={this.onFileChange} ref={this.inputFile} style={{display: 'none'}}/>
          <h1>Pack Generator</h1>
          <p>Please note that the generated pack will edit the English(US) langauge</p>
          <input placeholder='Pack Name' type="text" id="name" className='large' value={this.state.name} onChange={(e) => {this.setState({name: e.target.value})}}/>
          <p>Pack Name</p>
          <input placeholder='Description' type="text" id="name" className='medium' value={this.state.description} onChange={(e) => {this.setState({description: e.target.value})}}/>
          <p>Pack Description</p>

          {
          inputs.length > 0 ?
          inputs.map((e, i) => {
            if(e == undefined) return <br key={i}/>
            return (
              <Field key={e.index} value={e.value} name={e.key} superFunc={(v) => {
                this.values[e.index].value = v;
              }} />
            )
          }) :
          <h2>Select filters on the sidebar to begin.</h2>
          }
        </div>
        
      </div>
    )
  }
}

export default App;
