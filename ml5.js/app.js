/*
CLASIFICACON DE OBEJETO
*/
$("#check").prop("disabled", true);

function readURL(input) {
  if (input.files && input.files[0]) {
    $("#check").prop("disabled", false);
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#image").attr("src", e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
let img;

function check() {
  const element = document.getElementById("result");
  element.innerHTML = "Detecting. . .";
  $("#result").addClass("border");

  //initialize image classifier with mobilenet
  const classifier = ml5.imageClassifier("MobileNet");
  img = document.getElementById("image");
  classifier.classify(img, gotResult);
}

//function to run when result arrive
function gotResult(error, result) {
  const element = document.getElementById("result");
  if (error) {
    element.innerHTML = error;
  } else {
    console.log(result);
    let num = result[0].confidence * 100;
    element.innerHTML = "<h5>" + result[0].label + "</h5> confidence: <b>" + num.toFixed(2) + "% </b>";
  }  
}
