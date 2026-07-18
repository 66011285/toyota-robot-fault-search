async function searchFault() {

    const result = document.getElementById("result");

    try {

        const code = document
            .getElementById("searchBox")
            .value
            .trim()
            .toUpperCase();

        const response = await fetch("faults.json");

        if (!response.ok) {
            throw new Error("Could not load faults.json");
        }

        const faults = await response.json();

        const fault = faults.find(f => f.code === code);

        result.style.display = "block";

        if (!fault) {

            result.innerHTML = `
                <h2 style="color:red;">❌ Error Code Not Found</h2>
                <p>Please check the code and try again.</p>
            `;

            return;
        }

        result.innerHTML = `
            <h2 style="color:#d6001c;">🔍 Error Code : ${fault.code}</h2>

            <hr>

            <h2>🇬🇧 English</h2>

            <h3>${fault.title}</h3>

            <p>${fault.description}</p>

            <h3>Possible Causes</h3>
            <ul>
                ${fault.causes.map(c => `<li>${c}</li>`).join("")}
            </ul>

            <h3>Inspection Steps</h3>
            <ol>
                ${fault.inspection.map(i => `<li>${i}</li>`).join("")}
            </ol>

            <h3>Safety</h3>
            <ul>
                ${fault.safety.map(s => `<li>${s}</li>`).join("")}
            </ul>

            <hr>

            <h2>🇹🇭 ภาษาไทย</h2>

            <h3>${fault.titleThai}</h3>

            <p>${fault.descriptionThai}</p>

            <h3>สาเหตุที่เป็นไปได้</h3>
            <ul>
                ${fault.causesThai.map(c => `<li>${c}</li>`).join("")}
            </ul>

            <h3>ขั้นตอนการตรวจสอบ</h3>
            <ol>
                ${fault.inspectionThai.map(i => `<li>${i}</li>`).join("")}
            </ol>

            <h3>ข้อควรระวัง</h3>
            <ul>
                ${fault.safetyThai.map(s => `<li>${s}</li>`).join("")}
            </ul>
        `;

    } catch (error) {

        result.style.display = "block";
        result.innerHTML = `
            <h2 style="color:red;">⚠ Error</h2>
            <p>${error.message}</p>
        `;

        console.error(error);
    }
}

document.getElementById("searchBox").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchFault();
    }
});