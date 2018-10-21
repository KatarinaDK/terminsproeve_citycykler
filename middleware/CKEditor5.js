// DENNE FUNKTION OPRETTER EN EDITOR. BRUGES PÅ SIDEN ADMIN/SIDE_RET

let editor;

ClassicEditor
    .create(document.querySelector('#editor'), {
        
        toolbar: [ 'Heading', 'Link', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote' ]
    })
    .then(newEditor => {
        editor = newEditor;
    })
    .catch(error => {
        console.error(error);
    });