var dataTable;

$(document).ready(function () {
  $("#dataTbl").DataTable({
    ajax: "/Admin/Product/GetAll",
    columns: [
      { "data": "title","width":"15%" },
      { "data": "isbn","width":"15%" },
      { "data": "price","width":"15%" },
      { "data": "author","width":"15%" },
      { "data": "category.name","width":"15%" },
      {
        "data": "id",
        "render": function (data) {
          return `
            <div class="btn-group" role="group" style="width:200px">
                <a href="/Admin/Product/Upsert?id=${data}" class="btn btn-primary mx-2">
                    <i class="bi bi-pencil-square"></i>
                    Edit
                </a>
                <a class="btn btn-danger mx-2">
                    <i class="bi bi-trash-fill"></i>
                    Delete
                </a>
            </div>
            `
        },
      } 
    ]
  })
})