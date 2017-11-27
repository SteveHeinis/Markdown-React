import React from 'react';
// CSS
import './css/Markdown.css';
// JS
import {sampleText} from './js/sampleText';
// marked.js
import marked from 'marked';

export default class Markdown extends React.Component {

	state = {
		text: sampleText
		}

	// Si y a un local Storage, l'application ira le set par défaut lors que la page se montera.
	componentWillMount() {
		const localStorageText = localStorage.getItem('text');
		if (localStorageText){
			this.setState({
				text: localStorageText
			})
		}
	}


	// On configure le localStorage ( qui permet de garder en mémoire nos modifications du texte.)
	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('text', nextState.text)
	}

	editText = (event) => {
		const currentText = event.target.value;
		this.setState({
			text: currentText
		})
	};

	renderText = (text) => {
		const renderText = marked(text, {sanitize:true} /* Pour empecher les modifications HTML */);
		// Ensuite, on retourne un objet. React préfère les objets, dans le contexte où ce sera du html modifié par l'user. 
		return { __html: renderText}
	}

	clear = () => {
		this.setState({
			text: ""
		})
	}

	resetSample = () => {
		this.setState({
			text: sampleText
		})
	}

  render() {
    return (
      	<div>
      		<div className="container">
      			<div className="row">
      				<div className="col-sm-6">
      					<textarea value={this.state.text} rows="30" className="form-control" onChange={this.editText}>		
      					</textarea>
      					<button onClick={this.clear}>Clear</button>
      					<button onClick={this.resetSample}>Reset Sample</button>
      				</div>
      				<div className="col-sm-6">
      					{/* dangerouslySetInnerHTML = Attention, c'est du contenu amené à être entré par l'utilisateur. */}
      					<div dangerouslySetInnerHTML = {this.renderText(this.state.text)}/>
      				</div>
      			</div>
      		</div>
      	</div>
    );
  }
}

 