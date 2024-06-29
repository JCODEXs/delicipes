"use server";

import { serverActionForm } from "~/store/pantry";

export async function createRecipe(prevState, formData) {
  console.log(prevState, formData);

  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("description");
  const portions = formData.get("portions");
  const ingredients = JSON.parse(formData.get("ingredients"));
  const _id = formData.get("_id") || undefined;
  let errors = [];
  console.log(prevState, formData, _id);
  if (!title || title.trim().length === 0) {
    errors.push("Title is required.");
  }

  // if (!content || content.trim().length === 0) {
  //   errors.push("Content is required.");
  // }

  if (!portions) {
    errors.push("Portions are required.");
  }

  if (errors.length > 0) {
    return { errors };
  }
  serverActionForm({
    recipe: {
      key: Math.random(8) * 10000000,
      ingredients,
      description: content,
      title,
      portions,
    },
    _id: _id,
  });
  // redirect("/");
}
