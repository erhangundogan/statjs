/*
 * stat.js javascript statistical library
 * by Erhan Gundogan
 * erhan@trposta.net
 * September 26, 2011
 */

// Builtin functions
var op = {
  "+": function(a, b){return a + b;},
  "==": function(a, b){return a == b;},
  "===": function(a, b){return a === b;},
  "!": function(a){return !a;}
};

// toFixed with specific precision
Number.prototype.fixed = function(precision) {
  var power = Math.pow(10, precision || 0);
  return Math.round(this * power) / power;
}

/* Mean (Average)
 * Usage: array.mean();
 * Returns: Number
 */
Array.prototype.mean = function(len) {
  return this.reduce(op["+"]) / (len || this.length);
}

/* Variance
 * Usage: array.variance();
 * Returns: Number
 */
Array.prototype.variance = function() {
  var mn = this.mean();
  return this.map(function(a){
    return Math.pow(a-mn, 2);
  }).mean(this.length-1); // n-1
}

/* Standard Deviation: Math.sqrt(variance)
 * Usage: array.standard_deviation(true|false, 1..n, variance);
 * Returns: Number
 * All arguments optional
 * Defaults: isRound=false, precision=2
 * You can reuse variance value: array.standard_deviation(null, null, array.variance())
 */
Array.prototype.standard_deviation = function(isRound, precision, var_value) {
  var v = Math.sqrt(var_value ? var_value : this.variance());
  return isRound || false ? v.fixed(precision || 2) : v;
}

/* Coefficient of variation: standard_deviation/mean
 * Usage: array.coefficient_of_variation(true|false, 1..n, standard_deviation, mean);
 * Returns: Number
 * All arguments optional
 * Defaults: isRound=false, precision=2
 * You can reuse standard deviation and/or mean:
 *   array.coefficient_of_variation(null, null, array.standard_deviation(), array.mean())
 */
Array.prototype.coefficient_of_variation =
  function(isRound, precision, std_deviation_value, mean_value) {
  var cv = (std_deviation_value ? std_deviation_value : this.standard_deviation()) /
    (mean_value ? mean_value : this.mean());
  return isRound || false ? cv.fixed(precision || 2) : cv;
}

/* Range
 * Usage: array.range(min, max);
 * Returns: Object
 */
Array.prototype.range = function(min, max) {
  var r = Math.max.apply(Math, this) - Math.min.apply(Math, this);
  return { max: Math.round(r/max), min: Math.round(r/min) };
}

