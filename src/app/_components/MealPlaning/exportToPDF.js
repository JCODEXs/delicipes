import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// dentro del componente MealMatrix
export const exportToPDF = () => {
  const doc = new jsPDF();

  weekDays.forEach((day, index) => {
    if (index > 0) doc.addPage(); // nueva página excepto en la primera

    doc.setFontSize(16);
    doc.text(`Recetas del ${day}`, 14, 20);

    const dayTotal = dayTotals?.[day]?.toFixed(0) ?? 0;
    doc.setFontSize(12);
    doc.text(`Total del día: $${dayTotal}`, 14, 30);

    // Ingredientes del día
    const ingredientesDia = ingredientsTotList?.[1]?.[day];
    if (ingredientesDia) {
      const rows = Object.entries(ingredientesDia).map(([name, details]) => [
        name,
        `${details.cantidad.toFixed(1)} ${details.cantidad > 12 ? "gr" : "unid"}`,
        `$${details.precio.toFixed(0)}`,
      ]);

      autoTable(doc, {
        startY: 40,
        head: [["Ingrediente", "Cantidad", "Precio"]],
        body: rows,
      });
    } else {
      doc.text("No hay recetas seleccionadas para este día.", 14, 40);
    }
  });

  // Agregar resumen final
  doc.addPage();
  doc.setFontSize(16);
  doc.text("Resumen Semanal", 14, 20);
  doc.text(`Total Semana: $${dayTotals?.["total"]?.toFixed(0) ?? 0}`, 14, 30);

  doc.save("programa_recetas.pdf");
};
