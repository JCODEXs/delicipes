import { useEffect, useState } from "react";
import { usePantry } from "../../../store/pantry";
const units = ["und", "g", "gr", "Gr", "GR", "ml", "Ml", "ML"];
const min = { gr: 25, und: 1, g: 1, ml: 25, Ml: 50, GR: 100, ML: 100, Gr: 50 };
import styles from "./ingredientsDatabase.module.css";

export default function Form({ editableIngredient, onClose }) {
  const { addStoreIngredient, deleteSingleIngredient } = usePantry();
  const [formFields, setFormFields] = useState([
    { name: "", units: "", image: "", price: "" },
  ]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const values = [...formFields];
    values[index][name] = value;
    if (values[index].price) {
      if (values[index].units === "und" || values[index].units === "tbsp") {
        values[index].grPrice = values[index].price;
      } else {
        values[index].grPrice = values[index].price / 1000;
      }
    }
    setFormFields(values);
  };

  const handleAddField = () => {
    setFormFields([
      ...formFields,
      { name: "", units: "", image: "", price: "" },
    ]);
  };

  const handleRemoveField = (index) => {
    const values = [...formFields];
    values.splice(index, 1);
    setFormFields(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!editableIngredient) {
      // addIngredient(formFields[0]);
    } else {
      deleteSingleIngredient(editableIngredient._id);
    }
    formFields.forEach((ingredient) => {
      const id = Math.random(10) * 100000000000;
      addStoreIngredient([{ ingredient: ingredient, _id: id }]);
    });
    setFormFields([{ name: "", units: "", image: "", price: "" }]);
    onClose();
  };

  useEffect(() => {
    if (editableIngredient) {
      const editableIngredientCopy = { ...editableIngredient.ingredient };
      setFormFields([editableIngredientCopy]);
    }
  }, [editableIngredient]);

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        {formFields?.map((field, index) => (
          <div key={index} className={styles.formCard}>
            <div className={styles.inputRow}>
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="Name"
                value={field.name}
                onChange={(event) => handleChange(index, event)}
                required
              />
              <input
                className={styles.input}
                type="text"
                name="image"
                placeholder="Emoji or name"
                value={field.image}
                onChange={(event) => handleChange(index, event)}
                required
              />
            </div>
            <div className={styles.unitButtons}>
              {units.map((unit) => (
                <button
                  type="button"
                  className="button"
                  key={unit}
                  value={unit}
                  name="units"
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: 8,
                    border: "1px solid #e7c08a",
                    background: field.units === unit ? "#e7c08a" : "#fff",
                    color: "#5a2d06",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={(event) => handleChange(index, event)}
                >
                  {`${min[unit]}${unit}`}
                </button>
              ))}
            </div>
            <input
              style={{
                padding: "0.7rem",
                borderRadius: 8,
                border: "1px solid #ccc",
                width: "100%",
              }}
              type="number"
              name="price"
              placeholder={
                field.units !== "und" && field.units !== "tbsp"
                  ? " $ / Kg"
                  : " $ / unidad"
              }
              value={field.price}
              onChange={(event) => handleChange(index, event)}
              required
            />
            {formFields.length > 1 && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className={styles.removeButton}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        ))}
        <div className={styles.actionRow}>
          <button
            className="button"
            type="button"
            onClick={handleAddField}
            style={{
              flex: 1,
              background: "#e7c08a",
              color: "#5a2d06",
              border: "none",
              borderRadius: 10,
              padding: "1rem 0",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Create another
          </button>
          <button
            className="ModalButton"
            type="submit"
            style={{
              flex: 2,
              background: "#c9b87a",
              color: "#23262e",
              border: "none",
              borderRadius: 10,
              padding: "1rem 0",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {formFields.length > 1 ? "Save ingredients" : "Save ingredient"}
          </button>
        </div>
      </form>
    </div>
  );
}
