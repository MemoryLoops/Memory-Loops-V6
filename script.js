
async function generateMemory() {
    const apiKey = document.getElementById("apiKey").value.trim();
    const memory = document.getElementById("memoryInput").value.trim();
    const format = document.getElementById("formatSelect").value;
    const tone = document.getElementById("toneSelect").value;
    const outputDiv = document.getElementById("output");

    if (!apiKey || !memory) {
        alert("Please enter both your API key and a memory.");
        return;
    }

    const prompt = `Write a ${tone} ${format} based on this memory:\n\n"${memory}"`;

    outputDiv.textContent = "Generating... Please wait.";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.8
            })
        });

        const data = await response.json();
        const result = data.choices?.[0]?.message?.content || "Error: No response";
        outputDiv.textContent = result;
    } catch (error) {
        outputDiv.textContent = "Error generating memory. Check your API key and internet.";
    }
}

function exportPDF() {
    const element = document.getElementById("output");
    html2pdf().from(element).save("memory.pdf");
}
