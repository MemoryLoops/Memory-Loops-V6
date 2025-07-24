
function generateMemory() {
    const input = document.getElementById("memoryInput").value;
    const prompt = document.getElementById("promptSelect").selectedOptions[0].text;
    const output = document.getElementById("output");

    const memoryText = `Dear Family,\n\n${prompt}...\n\n${input}\n\nWith love,\nMemory Loops`;
    output.textContent = memoryText;
}

function exportPDF() {
    const element = document.getElementById("output");
    html2pdf().from(element).save("memory.pdf");
}
