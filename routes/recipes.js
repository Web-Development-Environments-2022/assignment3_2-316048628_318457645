var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/familyRecipes", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getFamilyRecipe();
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

router.get("/search", async (req, res, next) => {
  try{
    let queryS = req.query.query;
    let numOfRes = req.query.num;
    let cuisine = req.query.cuisine;
    let diet = req.query.diet;
    let intolerance = req.query.intolerance;
    let result = await recipes_utils.searchRecipes(queryS,numOfRes,cuisine,diet,intolerance);
    res.status(200).send(result);
  }
  catch (error){
    next(error);
  }
});



router.get("/", (req, res) => res.send("im here"));

router.get("/random",async (req,res,next)=> {
  try{
    const recipe_random = await recipes_utils.get3RandomRecipes();
    res.status(200).send(recipe_random);
  }
  catch(error){
    next(error);
  }});

/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns a full details of a recipe by its id
 */
router.get("/fullDetails/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeFullDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

router.post("", async (req, res, next) => {
  try {
    let recipe_details = {
      title: req.body.title,
      readyInMinutes: req.body.readyInMinutes,
      imageUrl: req.body.imageUrl,
      popularity: req.body.popularity,
      vegan: req.body.vegan,
      vegetarian: req.body.vegetarian,
      glutenFree: req.body.glutenFree,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      numOfServings: req.body.numOfServings,
      user_id: req.session.user_id,
    };
    recipes_utils.addRecipeToDB(recipe_details);
    res.status(201).send({ message: "recipe created", success: true });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
