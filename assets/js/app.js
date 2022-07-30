// fetch ile api`leri cekirik
fetch("https://jsonplaceholder.typicode.com/posts")
  // gelen response`u json formatina ceviririk
  .then((res) => res.json())
  // gelen datalar ugurla geldiyi ucun then blokuna kecir
  .then((data) => {
    // parametrik olaraq datalari cekirik
    let tempTable = "";
    // gelen datalari donguye salmaq ucun forEach methodundan istifade edirik
    data.forEach((k) => {
      // datalari cedvele salmaq ucun literal template icine saliriq
      tempTable += `
      <tr>
          <td>${k.id}</td>
          <td>${k.title}</td>
          <td>${k.body}</td>
          <td>${k.userId}</td>
          <td><button  type="button"  data-bs-toggle="modal" data-bs-target="#fetchModal"  class="click_me btn btn-outline-primary " data-id="${k.id}"><i class="fa-solid fa-comments"></i></button></td>
      </tr>
          `;
    });
// dongude olan api`lari cedvele daxil edirik
    document.querySelector("tbody").innerHTML = tempTable;
    // filterin ishlemesi ucun id`ni burada cagiririq
    $("#datafilter").DataTable();
  })
// eger api`lar duzgun cekilmirse catch bloguna kecir
  .catch((err) => console.log("Error:" + err));

  // commentin altinda olan buttonlara klick eden zaman heresi ayri-ayri id qebul ederek yeni data cekir.
$(document).on("click", ".click_me", (e) => {
  // ustdeki literal template de data-id ayri-ayri id qebul ederek melumati deyisir ve biz onu burada klick olunudugunu qeyd etmisik
  let id = e.target.getAttribute("data-id");
  // her  id ye gore api`lari cekirik
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
    .then((res) => res.json())
    .then((data) => {
      let popupTable = "";
    // gelen datalari donguye salmaq ucun forEach methodundan istifade edirik
      data.forEach((k) => {
        popupTable += `
          <tr>
          <td >${k.id}</td>
          <td >${k.postId}</td>
          <td >${k.name}</td>
          <td >${k.email}</td>
          <td >${k.body}</td>
          </tr>
          `;
      });
// dongude olan api`lari modaldaki cedvele daxil edirik
      document.querySelector(".mytbody").innerHTML = popupTable;
    });
});

