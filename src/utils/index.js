exports.printEnd = function printEnd(data) {
  const success = data.success.map((el) => el.name);
  console.log('Process finished with:\n', JSON.stringify({ ...data, success }, null, 2));
};

exports.printProjectsToUpdate = function printProjectsToUpdate(data) {
  console.log(`Projects to update (${data.length}):`);
  data.forEach((el) => console.log(`* ${el.name}`));
  console.log('\n');
};
