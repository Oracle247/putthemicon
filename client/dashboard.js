$(document).ready(function() {
    $('#example').DataTable({
        "processing": true,
        "ajax": "/userDetails",
        rowReorder: true,
        "lengthMenu": [
            [5, 10, 15, -1],
            [5, 10, 15, "All"]
        ],
        "columns": [
            { 'data': 'fullName' },
            { 'data': 'email' },
            { 'data': 'phone' },
            { 'data': 'gender' },
            { 'data': 'dateOfBirth' },
            { 'data': 'address' },
            { 'data': 'state' },
            { 'data': 'lga' },
            { 'data': 'city' },
            { 'data': 'hobby' },
            { 'data': 'genre' },
            { 'data': 'about' }
        ]
    });
});

console.log("hi")