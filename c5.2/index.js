const parser = new DOMParser();
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, 'text/xml');
const listNode = xmlDOM.querySelector('list');
const studentNode = listNode.querySelectorAll('student');
for (let student of studentNode) {
    const nameNode = student.querySelector('name');
    const firstNameNode = nameNode.querySelector('first');
    const lastNameNode = nameNode.querySelector('second');
    const ageNode = student.querySelector('age');
    const profNode = student.querySelector('prof');
    const langAttr = nameNode.getAttribute('lang');
    const result = {
      name: firstNameNode.textContent,
      age: Number(ageNode.textContent),
      prof: profNode.textContent,
      lang: langAttr
    };
    console.log(result)
  };

const jsonString = `{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}`;

const data = JSON.parse(jsonString);
const list = data.list;
let arr = [];
for (let node of list) {
  const result = {name: node.name, age: Number(node.age), prof: node.prof};
  arr.push(result);
};
console.log(arr)