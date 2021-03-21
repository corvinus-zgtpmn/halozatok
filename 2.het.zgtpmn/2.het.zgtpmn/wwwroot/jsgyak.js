window.onload = () => {
    let szamok = document.getElementById("szorzas");

    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        szamok.appendChild(sor);
        sor.classList.add("sorban");

        for (var o = 0; o < 10; o++) {
            let szam = document.createElement("div");
            sor.appendChild(szam);
            szam.innerText = (o + 1) * (s + 1);
            szam.classList.add("negyzet");
            szam.style.backgroundColor = `rgb(${200 - ((o + 3) * (s + 4))},0,${255 - ((o + 4) * (s + 3))})`;
        }
    }

    let novekvo = document.getElementById("elso");

    for (var s = 0; s < 10; s++) {
        let újszam = document.createElement("div");
        novekvo.appendChild(újszam);
        újszam.innerText = (s + 1);
        újszam.classList.add("negyzet");
        újszam.style.backgroundColor = `rgb(${255 - (s * 5)},${100 - (s * 10)},0)`;
    }


    var faktoriális = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * faktoriális(n - 1)
        }
    }
    let pascalos = document.getElementById("masodik");
    console.log("betöltődött");

    for (var s = 0; s < 10; s++) {
        let sor1 = document.createElement("div");
        sor1.classList.add("sor");
        pascalos.appendChild(sor1);

        for (var o = 0; o <= s; o++) {
            let pascal = document.createElement("div");
            pascal.classList.add("elem");
            pascal.innerText = (faktoriális(s) / (faktoriális(o) * faktoriális(s - o)));
            pascal.style.backgroundColor = `rgb(0,${255 - (faktoriális(s) / (faktoriális(o) * faktoriális(s - o)))},${255 - (faktoriális(s) / (faktoriális(o) * faktoriális(s - o)))})`;
            sor1.appendChild(pascal);
        }
    }
}