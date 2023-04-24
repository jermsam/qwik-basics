import {component$, useStore,$} from '@builder.io/qwik';

export default component$((props = {reviews: []}) => {
  const reviews = useStore([...props.reviews]);
  
  const makeArray = $((count) => {
    let ar = [];
    for (let i = 0; i < count; i++) {
      ar.push(
        <span class="material-icons">
star
</span>
      );
    }
    return ar;
  });

  return (
    <div style='display: flex;  gap: 10%; margin:1rem;'>
      {
        reviews.map((review, index) => (
          <div key={index}>
            <div>
              {
                makeArray(review.ratings)
              }
            </div>
            <div>{review.description}</div>
            <div style='color:grey'>{review.author.name}</div>
          </div>),
        )
      }
    </div>
  );
});



