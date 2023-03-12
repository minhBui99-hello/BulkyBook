var dataTable;

$(document).ready(function () {
  $("#dataTbl").DataTable({
    ajax: "/Admin/Company/GetAll",
    columns: [
      { data: "name", width: "15%" },
      { data: "streetAddress", width: "15%" },
      { data: "city", width: "15%" },
      { data: "state", width: "15%" },
      { data: "postalCode", width: "15%" },
      { data: "phoneNumber", width: "15%" },
      {
        data: "id",
        render: function (data) {
          return `
            <div class="btn-group" role="group" style="width:200px">
                <a href="/Admin/Company/Upsert?id=${data}" class="btn btn-primary mx-2">
                    <i class="bi bi-pencil-square"></i>
                    Edit
                </a>
                <a onClick=Delete('/Admin/Company/Delete/${data}') class="btn btn-danger mx-2">
                    <i class="bi bi-trash-fill"></i>
                    Delete
                </a>
            </div>
            `;
        },
      },
    ],
  });
});

function Delete(url) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: url,
        type: "DELETE",
        success: function (data) {
            console.log(data.success);
            if(data.success)
            {
                dataTable.ajax.reload();
                toastr.success(data.message);
            }
            else{
                toastr.error(data.message);
            }
        }
      })
    }
  });
}
