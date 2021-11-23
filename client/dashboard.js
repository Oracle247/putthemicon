$(document).ready(function() {
    $('#example').DataTable({
        "processing": true,
        "ajax": "/userDetails",
        rowReorder: true,
        "lengthMenu": [
            [2, 5, 10, -1],
            [2, 5, 10, "All"]
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