import Quill from 'quill';
import 'quill/dist/quill.snow.css';


Template.Quill.onRendered(function() {
  this.quill = new Quill('#editor-container', {
    modules: {
      toolbar: '#toolbar-container',
    },
    placeholder: 'Type here...',
    theme: 'snow',
  });
  if (this.data.editorValue) {
    this.quill.pasteHTML(0, this.data.editorValue);
  }
});
