Если буква уже поставлена —
            ничего не делаем.
        */

        if (
            letter.classList.contains(
                "correct-position"
            )
        ) {

            return;

        }


        letter.classList.add(
            "correct-position"
        );


        placedLetters++;


        /*
            Все шесть букв стоят правильно.
        */

        if (placedLetters === letters.length) {

            setTimeout(resetLetters, 1500);

        }

    });

});


/*
    Возвращаем буквы
    в исходные позиции.
*/

function resetLetters() {

    letters.forEach((letter) => {

        letter.classList.remove(
            "correct-position"
        );

    });


    placedLetters = 0;

}



/* =====================================================
   4. ТРАВА
   =====================================================

   Каждая травинка реагирует
   на положение мыши отдельно.

   Чем ближе курсор к травинке,
   тем сильнее она наклоняется.
*/


const grassContainer =
    document.querySelector(".grass-layer");


const grassBlades = [
    ...document.querySelectorAll(".grass-blade")
];


grassContainer.addEventListener(
    "pointermove",
    (event) => {


        const containerRect =
            grassContainer.getBoundingClientRect();


        const mouseX =
            event.clientX -
            containerRect.left;


        grassBlades.forEach((blade) => {


            const bladeRect =
                blade.getBoundingClientRect();


            const bladeCenter =
                bladeRect.left +
                bladeRect.width / 2 -
                containerRect.left;


            const distance =
                mouseX - bladeCenter;


            /*
                Чем дальше мышь,
                тем меньше наклон.
            */

            const maxDistance = 180;

            let influence =
                1 -
                Math.abs(distance) /
                maxDistance;


            influence =
                Math.max(
                    0,
                    Math.min(1, influence)
                );


            /*
                Направление движения.
            */

            const direction =
                distance > 0 ? 1 : -1;


            const rotation =
                direction *
                influence *
                12;


            blade.style.transform =
                `rotate(${rotation}deg)`;

        });

    }
);


/*
    Возвращаем траву,
    когда мышь ушла.
*/

grassContainer.addEventListener(
    "pointerleave",
    () => {

        grassBlades.forEach((blade) => {

            blade.style.transform =
                "rotate(0deg)";

        });

    }
);



/* =====================================================
   5. КОРНИ
   =====================================================

   Клик:

   корень 1 → слово 1
   корень 2 → слово 2
   корень 3 → слово 3

   При повторном клике можно убрать слово.
*/


const roots = [
    ...document.querySelectorAll(".root")
];


const rootWords = [
    ...document.querySelectorAll(".root-word")
];


/*
    =====================================================
    ← ТУТ ВПИШИ СВОИ СЛОВА
    =====================================================
*/

const rootTexts = [

    "СЛОВО 1",

    "СЛОВО 2",

    "СЛОВО 3"

];


roots.forEach((root, index) => {

    root.addEventListener("click", () => {


        const word =
            rootWords[index];


        /*
            Если слово уже видно —
            скрываем его.
        */

        if (
            word.classList.contains("visible")
        ) {

            word.classList.remove("visible");

            return;

        }


        /*
            Перед появлением
            записываем настоящее слово.
        */

        word.textContent =
            rootTexts[index];


        word.classList.add("visible");

    });

});
