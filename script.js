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

    result.style.display = "block";

    result.innerHTML = `
        <div class="error-box">

            <h2>❌ Invalid Error Code</h2>

            <p>
                <strong>${code}</strong> was not found in the fault database.
            </p>

            <p>
                Please verify the error code shown on the Teach Pendant and try again.
            </p>

            <hr>

            <h2>❌ รหัสข้อผิดพลาดไม่ถูกต้อง</h2>

            <p>
                ไม่พบรหัส <strong>${code}</strong> ในฐานข้อมูลข้อผิดพลาด
            </p>

            <p>
                กรุณาตรวจสอบรหัสข้อผิดพลาดที่แสดงบน Teach Pendant แล้วลองค้นหาอีกครั้ง
            </p>

        </div>
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

document.getElementById("searchBox").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchFault();
    }
});
