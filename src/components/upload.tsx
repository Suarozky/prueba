/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, DragEvent, ChangeEvent } from "react";
import { Upload, X } from "lucide-react";
import { useModalStore } from "../store/store";
import ImageDetailsModal from "./constants/modal/modalData";

interface ImageUploadPreviewProps {
  maxSizeInMB?: number;
  onImageUpload?: (file: File) => void;
  allowedTypes?: string[];
}

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({
  maxSizeInMB = 5,
  onImageUpload,
  allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
}) => {
  const { addImageData, imageHistory, setCurrentImage, openModal } =
    useModalStore();
  const [preview, setPreview] = useState<string>("");
  const [comparison, setComparison] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filledFields, setFilledFields] = useState<{ [key: string]: string }>( {});
  const [showResults, setShowResults] = useState<boolean>(false);

  const fields = [
    { label: "IA KI67", name: "iaKi67" },
    { label: "IA Total Cells", name: "iaTotalCells" },
    { label: "IA Positive Cells", name: "iaPositiveCells" },
    { label: "IA Negative Cells", name: "iaNegativeCells" },
    { label: "KI67", name: "ki67" },
    { label: "Total Cells", name: "totalCells" },
    { label: "Positive Cells", name: "positiveCells" },
    { label: "Negative Cells", name: "negativeCells" },
    { label: "Wrong KI67", name: "wrongKi67" },
    { label: "Wrong Total Cells", name: "wrongTotalCells" },
    { label: "Wrong Positive Cells", name: "wrongPositiveCells" },
    { label: "Wrong Negative Cells", name: "wrongNegativeCells" },
  ];

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  

  const validateFile = (file: File): boolean => {
    setError("");

    if (!allowedTypes.includes(file.type)) {
      setError(
        `Tipo de archivo no permitido. Tipos permitidos: ${allowedTypes.join(
          ", "
        )}`
      );
      return false;
    }

    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeInMB) {
      setError(
        `El archivo es demasiado grande. Tamaño máximo: ${maxSizeInMB}MB`
      );
      return false;
    }

    return true;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  interface CustomImageData {
    id?: string;
    preview?: string;
    comparison?: string;
    fields?: { [key: string]: string };
    timestamp?: number;
  }
  
  const handleImageClick = (imageData: CustomImageData) => {
      const completeImageData = {
        ...imageData,
        id: imageData.id || '',
        preview: imageData.preview || '',
        comparison: imageData.comparison || '',
        fields: imageData.fields || {},
        timestamp: imageData.timestamp ? new Date(imageData.timestamp).getTime() : Date.now(),
      };
      setCurrentImage(completeImageData);
      openModal();
    };

  const handleFile = (file: File): void => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
        // Aquí simulamos la "imagen revisada" para fines de demostración.
        setComparison(e.target.result as string);
        onImageUpload?.(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (): void => {
    setPreview("");
    setComparison("");
    setError("");
  };

  const generateRandomValues = (): { [key: string]: string } => {
    const randomValues: { [key: string]: string } = {};
    fields.forEach((field) => {
      randomValues[field.name] = (Math.random() * 9 + 1).toFixed(2);
    });
    return randomValues;
  };

  const handleSend = (): void => {
    if (!preview) return;

    setLoading(true);
    const randomValues = generateRandomValues();

    setTimeout(() => {
      setFilledFields(randomValues);
      // Guardar en el store de Zustand
      addImageData(preview, comparison, randomValues);
      setShowResults(true);
      setLoading(false);
    }, 5000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 w-full">
      <div className="space-y-4">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border py-8 border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {!preview ? (
          <div
            className={`relative border-2 border-dashed rounded-lg text-center
              ${dragActive ? "border-blue-500 bg-blue-50" : "border-pink-700"}
              transition-all duration-200 ease-in-out`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer py-8"
              onChange={handleChange}
              accept={allowedTypes.join(",")}
            />
            <div className="space-y-4 p-8">
              <Upload className="mx-auto text-gray-400" />
              <div className="text-gray-600">
                <p className="font-medium">Arrastra y suelta tu imagen aquí</p>
                <p className="text-sm">o haz clic para seleccionar</p>
                <p className="text-xs mt-2">Tamaño máximo: {maxSizeInMB}MB</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative flex justify-center rounded-lg overflow-hidden border border-pink-700">
            <img
              src={preview}
              alt="Preview"
              className="w-full md:w-96 h-64 object-cover select-none"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {preview && (
          <button
            onClick={handleSend}
            className={`w-full p-3 text-white rounded-lg ${
              loading ? "bg-gray-500" : "bg-pink-500 hover:bg-pink-600"
            } transition-colors`}
            type="button"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Enviar"}
          </button>
        )}

        {preview && (
          <div className="mt-4 flex flex-wrap gap-5 justify-start">
            <div>
              <p className="text-sm font-medium">Imagen Original:</p>
              <img
                src={preview}
                alt="Original"
                className="w-32 h-32 object-cover border select-none"
              />
            </div>
            {comparison && (
              <div>
                <p className="text-sm font-medium">Imagen Revisada:</p>
                <img
                  src={comparison}
                  alt="Revisada"
                  className="w-32 h-32 object-cover border select-none"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-sans">Campos actuales:</h3>
          {fields.map((field) => (
            <div key={field.name} className="flex justify-between gap-10">
              <label className="text-sm font-medium">{field.label}</label>
              <input
                type="text"
                value={filledFields[field.name] || ""}
                className="border rounded text-xl"
                readOnly
              />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-sans mb-4">Historial de imágenes:</h3>
          <div className="flex gap-4 flex-wrap">
            {imageHistory.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleImageClick(item)}
              >
                <div className="flex gap-4 mb-4">
                  <img
                    src={item.comparison}
                    alt="Revisada"
                    className="w-20 h-20 object-cover rounded select-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <ImageDetailsModal />
      </div>
    </div>
  );
};

export default ImageUploadPreview;
