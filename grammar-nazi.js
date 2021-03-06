function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function swap(a, b, text) {
  a = a.replace("'", "['’]");
  var small = new RegExp("\\s"+a+"\\s");
  var end = new RegExp("\\s"+a+"\\.");
  var comma = new RegExp("\\s"+a+",");
  var big = new RegExp(capitaliseFirstLetter(a)+"\\s");

  return text.replace(small, " " + b + " ")
    .replace(big, capitaliseFirstLetter(b) + " ")
    .replace(end, " " + b + ".")
    .replace(comma, " " + b + ",");
}

function hanoiSwap(a, b, text) {
  text = swap(a, "confuckulator", text);
  text = swap(b, a, text);
  return swap("confuckulator", b, text);
}

var pairs = [
  ["your","you're"],
  ["their","they're"],
  ["its","it's"],
  ["affect","effect"],
  ["we're","were"],
  ["build","built"],
  ["accept","except"],
  ["is","are"],
  ["has","have"],
  ["an","a"],
  ["no","know"],
  ["than","then"],
  ["thought","fought"],
  ["spend","spent"],
  ["too","to"]
]

var oneWayPairs = [
  ["am","are"]
]

function containsSelector(word) {
  var string = ":contains(" + word + "), :contains(" + capitaliseFirstLetter(word) + ")";
  if (word.indexOf("'") > -1) {
    var word2 = word.replace("'","’");
    string += ", :contains(" + word2 + "), :contains(" + capitaliseFirstLetter(word2) + ")";
  }
  return string;
}

function containsPairSelector(a,b) {
  return containsSelector(a) + ", " + containsSelector(b);
}

$(function() {
  var selector = pairs.map(function(pair) {
    return containsPairSelector(pair[0], pair[1]);
  }) + oneWayPairs.map(function(pair) {
    return containsSelector(pair[0]);
  }).join(", ");

  $(selector).contents().filter(function() {
    return this.nodeType == 3;
  }).each(function() {
    for (var i = 0; i < pairs.length; i++) {
      this.textContent = hanoiSwap(pairs[i][0], pairs[i][1], this.textContent);
    }
    for (i = 0; i < oneWayPairs.length; i++) {
      this.textContent = swap(oneWayPairs[i][0], oneWayPairs[i][1], this.textContent);
    }
  });
});
