insert into cart(product_id, quantity)
values ($1, 1);

select * from cart
join products on cart.product_id = products.id
order by products.id;