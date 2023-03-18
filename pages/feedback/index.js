import { buildFeedbackPath, extractFeedback } from '../api/feedback';
import { useState } from 'react';

function FeedbackPage(props) {
  const [feedBackData, setFeedBackData] = useState();

  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedBackData(data.feedback));
  }
  return (
    <>
      {feedBackData?.email}
      <ul>
        {props.feedBackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show details</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedBackItems: data
    }
  };
}

export default FeedbackPage;
