import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import editorStyles from './editorStyles.css';

const linkifyPlugin = createLinkifyPlugin();
const plugins = [linkifyPlugin];

class SimpleMentionEditor extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
  }

  render() {
    return (
      <div className={ editorStyles.editor } onClick={ this.focus }>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref="editor"
        />
      </div>
    );
  }

  onChange(editorState) {
    console.log('🎉', editorState);
    this.setState({
      editorState,
    });
  }

  focus() {
    this.refs.editor.focus();
  }
}


const DraftEditor = (props) => {
  return <SimpleMentionEditor/>;
};

export default DraftEditor;
