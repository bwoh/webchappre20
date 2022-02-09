import express from "express";
import bp from "body-parser";

const app = express();
const port = 3000;

const mechanic = [
  { id: 1, name: "건담", model: "RX-78-2" },
  { id: 2, name: "건탱크", model: "RX-75" },
  { id: 3, name: "자쿠II", model: "MS-06F" }
];

app.use(bp.json());
// application/x-www-form-urlencoded 처리
app.use(bp.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/mechanic", (req, res) => {
  res.json(mechanic);
});

app.get("/mechanic/:id", (req, res) => {
  //console.log(req.params.id);
  const target = mechanic.find((unit) => unit.id === Number(req.params.id));
  //console.log(target);
  if (target === undefined) res.json({ status: "Not Found" });
  res.json(target);
});

app.post("/mechanic/", (req, res) => {
  let max = 0;
  mechanic.forEach((unit) => {
    const uid = Number(unit.id);
    if (uid > max) max = uid;
  });
  console.log(max);

  const idNum = Number(req.body.id);
  let mech = {
    id: idNum,
    name: req.body.name,
    model: req.body.model
  };
  console.log(mech);
  if (req.body.id === "null") {
    console.log(mech);
    mech.id = max + 1;
    mechanic.push(mech);
    //return res.json(mech);
    return res.json(mechanic);
  }

  // id를 지정했으나 기존 배열에 없어서 추가된 경우
  const target = mechanic.find((unit) => unit.id === idNum);
  console.log(target);
  if (target === undefined) {
    mechanic.push(mech);
    //return res.json(mech);
    return res.json(mechanic);
  }

  res.json({ status: "id exists" });
});

app.get("/mechanic/delete/:id", (req, res) => {
  const targetIndex = mechanic.findIndex(
    (unit, index) => unit.id === Number(req.params.id)
  );
  console.log(targetIndex);

  if (targetIndex < 0) return res.json({ status: "Not Found" });

  mechanic.splice(targetIndex, 1);
  //res.json({ status: "deleted" });
  res.json(mechanic);
});

app.listen(process.env.PORT || port, () => {
  console.log(`서버 실행 (${port})`);
});
