import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useModalStore } from "../../../store/store";
import { jsPDF } from "jspdf";

const ImageDetailsModal = () => {
  const { isOpen, closeModal, currentImage } = useModalStore();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    doc.text("Detalles de la Imagen", 20, 20);
    doc.text(`Nombre del paciente: ${userEmail}`, 20, 30);
    doc.text(
      `Fecha de análisis: ${new Date(
        currentImage!.timestamp
      ).toLocaleString()}`,
      20,
      40
    );

    doc.text("Información del Análisis - Valores IA", 20, 50);
    doc.text(`KI67: ${currentImage!.fields.iaKi67}`, 20, 60);
    doc.text(`Total Cells: ${currentImage!.fields.iaTotalCells}`, 20, 70);
    doc.text(`Positive Cells: ${currentImage!.fields.iaPositiveCells}`, 20, 80);
    doc.text(`Negative Cells: ${currentImage!.fields.iaNegativeCells}`, 20, 90);

    doc.text("Valores Reales", 20, 100);
    doc.text(`KI67: ${currentImage!.fields.ki67}`, 20, 110);
    doc.text(`Total Cells: ${currentImage!.fields.totalCells}`, 20, 120);
    doc.text(`Positive Cells: ${currentImage!.fields.positiveCells}`, 20, 130);
    doc.text(`Negative Cells: ${currentImage!.fields.negativeCells}`, 20, 140);

    doc.text("Valores Incorrectos", 20, 150);
    doc.text(`Wrong KI67: ${currentImage!.fields.wrongKi67}`, 20, 160);
    doc.text(
      `Wrong Total Cells: ${currentImage!.fields.wrongTotalCells}`,
      20,
      170
    );
    doc.text(
      `Wrong Positive Cells: ${currentImage!.fields.wrongPositiveCells}`,
      20,
      180
    );
    doc.text(
      `Wrong Negative Cells: ${currentImage!.fields.wrongNegativeCells}`,
      20,
      190
    );

    doc.save("detalles_imagen.pdf");
  };

  if (!currentImage || !isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeModal}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-sm font-semibold">Detalles de la Imagen</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={generatePDF}
                className="h-8 px-3 text-sm bg-blue-500 text-white rounded-lg flex items-center justify-center"
                title="Descargar PDF"
              >
                💾
              </button>
              <button
                onClick={closeModal}
                className="h-8 px-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                title="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2 text-pink-700">
                  Imagen Original
                </h3>
                <img
                  src={currentImage.preview}
                  alt="Original"
                  className="w-full h-64 object-cover rounded-lg select-none"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2 text-pink-700">
                  Imagen Revisada
                </h3>
                <img
                  src={currentImage.comparison}
                  alt="Revisada"
                  className="w-full h-64 object-cover rounded-lg select-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-4 text-pink-700">
                  Información del Análisis
                </h3>
                <div className="grid gap-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-pink-700">
                      Valores IA
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">KI67:</p>
                        <p className="font-medium">
                          {currentImage.fields.iaKi67}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Cells:</p>
                        <p className="font-medium">
                          {currentImage.fields.iaTotalCells}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Positive Cells:</p>
                        <p className="font-medium">
                          {currentImage.fields.iaPositiveCells}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Negative Cells:</p>
                        <p className="font-medium">
                          {currentImage.fields.iaNegativeCells}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-pink-700">
                      Valores Reales
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">KI67:</p>
                        <p className="font-medium">
                          {currentImage.fields.ki67}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Cells:</p>
                        <p className="font-medium">
                          {currentImage.fields.totalCells}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Positive Cells:</p>
                        <p className="font-medium">
                          {currentImage.fields.positiveCells}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Negative Cells:</p>
                        <p className="font-medium">
                          {currentImage.fields.negativeCells}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-pink-700">
                      Valores Incorrectos
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">Wrong KI67:</p>
                        <p className="font-medium">
                          {currentImage.fields.wrongKi67}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Wrong Total Cells:
                        </p>
                        <p className="font-medium">
                          {currentImage.fields.wrongTotalCells}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Wrong Positive Cells:
                        </p>
                        <p className="font-medium">
                          {currentImage.fields.wrongPositiveCells}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Wrong Negative Cells:
                        </p>
                        <p className="font-medium">
                          {currentImage.fields.wrongNegativeCells}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <span className="text-sm text-gray-500">
                  Nombre del paciente: {userEmail}
                </span>
                <p className="text-sm text-gray-500">
                  Fecha de análisis:{" "}
                  {new Date(currentImage.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageDetailsModal;
