function clicks() {
  var testcases = {
    input: ["4 \n1 2 3 4]", "5 \n1 1 1 1 1", "5 \n3 1 2 10 1 "],
    output: ["1 3 6 10 ", "1 2 3 4 5 ", "3 4 6 16 17 "],
  };

  var inputt = document.querySelector("#ipp").value;

  for (var i = 0; i <= 2; i++) {
    var to_compile = {
      LanguageChoice: "7",
      Program: editor.getValue(),
      Input: testcases.input[i],
      CompilerArgs: "-Wall -std=c++14 -O2 -o a.out source_file.cpp",
    };
    setTimeout("", 4000);
    $.ajax({
      url: "https://rextester.com/rundotnet/api",
      type: "POST",
      data: to_compile,
      async: false,
    })
      .done(function (data) {
        if (data.Result == testcases.output[i]) {
          var j = i + 1;
          document.getElementById("t" + parseInt(j)).style.color = "green";
          document.getElementById("t" + parseInt(j)).innerHTML =
            "Test Case " + j + " \n Passed";
          if (i == 2) {
            alert("Shabbashhhhh!!!!!!");
          }
        } else if (data.Result == null && i == 2) {
          alert(
            "Error occoured in your program : \n" + JSON.stringify(data.Errors)
          );
          for (var k = 0; k <= 2; k++) {
            var j = i + 1;
            document.getElementById("t" + parseInt(j)).style.color = "red";
            document.getElementById("t" + parseInt(j)).innerHTML =
              "Test Case " + j + "  \n Failed";
          }
        } else {
          var j = i + 1;
          document.getElementById("t" + parseInt(j)).style.color = "red";
          document.getElementById("t" + parseInt(j)).innerHTML =
            "Test Case " + j + "  \n Failed";
        }
      })
      .fail(function (data, err) {
        alert(
          "Error occoured :  " +
            JSON.stringify(data) +
            " " +
            JSON.stringify(err)
        );
      });
  }
}
