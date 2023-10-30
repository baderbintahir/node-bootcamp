const fs = require("fs");
const superagent = require("superagent");

// THEN/CATCH
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file 😢");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 😢");
      resolve("success");
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`)
//   .then((res) => {
//     console.log(`Breed: ${res}`);

//     return superagent.get(`https://dog.ceo/api/breed/${res}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random dog image saved to file!");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// ASYNC/AWAIT
const getDogPic = async () => {
  try {
    const breed = await readFilePro(`${__dirname}/dog.txt`);
    console.log(breed);

    const apiRes0 = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    const apiRes1 = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    const apiRes2 = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    const allRes = await Promise.all([apiRes0, apiRes1, apiRes2]);
    const imgs = allRes.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro("dog-img.txt", imgs?.join("\n"));
    console.log("Random dog image saved to file!");
  } catch (err) {
    console.log(err.message);
  }

  return "2: READY 🐶";
};

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics!");
  } catch (err) {
    console.log("ERROR 💥");
  }
})();

// console.log("1: Will get dog pics!")
// getDogPic();
// console.log("3: Done getting dog pics!")
