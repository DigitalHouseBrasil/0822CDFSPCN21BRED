USE sakila;

-- SELECT [] FROM [] WHERE []
-- SELECT *
-- FROM category, film_category
-- WHERE category.category_id = film_category.category_id;

-- SELECT [] FROM [] [TIPO] JOIN [] ON []
-- SELECT *
-- FROM category 
-- LEFT JOIN film_category
-- ON category.category_id = film_category.category_id;

-- SELECT DISTINCT [] FROM []
-- SELECT DISTINCT actor.first_name, actor.last_name, film.language_id
-- FROM actor 
-- LEFT JOIN film_actor
-- ON actor.actor_id = film_actor.actor_id
-- LEFT JOIN film
-- ON film.film_id = film_actor.film_id;

-- SELECT [] FROM [] GROUP BY []
SELECT category.name AS categoria, AVG(payment.amount) faturamento
FROM category
LEFT JOIN film_category ON category.category_id = film_category.category_id
LEFT JOIN film ON film_category.film_id = film.film_id
LEFT JOIN inventory ON film.film_id = inventory.film_id
LEFT JOIN rental ON inventory.inventory_id = rental.inventory_id
LEFT JOIN payment ON rental.rental_id = payment.rental_id
GROUP BY categoria
ORDER BY faturamento DESC;
