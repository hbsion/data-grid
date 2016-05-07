Template.ooTextEditor.events({
  'click .js-saveEditor'(e, t) {
    const editorState = t.find('.ql-editor').innerHTML;
    // Save state to database
    console.log('🐳', editorState);
  },
  'click .js-closeEditor'(e, t) {
    // Close editor modal witout saving.
    console.log('🎯', 'Closing...');
  },
});


