 
  function openDiscardModal() {
    document.getElementById('discardModal').style.display = 'block';
    document.getElementById('ea3myModal').style.display='none';
    console.log("i3vb3b3e3",openRequestModal)
   }
   function closeDescardModal() {
    document.getElementById('discardModal').style.display = 'none';
   }
   function redirectToEnrollment() {
    window.location.href = "../ea3-enrollment/ea3-enrollment.html";
   }
   window.onclick = function(event) {
    var modal = document.getElementById('discardModal');
    if (event.target == modal) {
    modal.style.display = "none";
    }
   }
  
  
  
  
  
  function openRequestModal() {
    document.getElementById('requestModal').style.display = 'block';
    document.getElementById('ea3myModal').style.display='none';
    console.log("i3vb3b3e3",openRequestModal)
   }
   function closeRequestModal() {
    document.getElementById('requestModal').style.display = 'none';
   }
   function redirectToEnrollment() {
    window.location.href = "../ea3-enrollment/ea3-enrollment.html";
   }
   window.onclick = function(event) {
    var modal = document.getElementById('requestModal');
    if (event.target == modal) {
    modal.style.display = "none";
    }
   }

