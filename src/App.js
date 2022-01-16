import React, {useState} from 'react';

function App() {

  const[showPopup, setShowPopup] = useState(false);
  const[id, setId] = useState(0);
  const[currentName, setCurrentName] = useState('');
  const[currentDescription, setcurrentDescription] = useState('');
  const[currentComment, setcurrentComment] = useState('');
  const[comments, setComments] = useState([]);
  const[selectedComment, setSelectedComment] = useState({});

  const nameChangeHandler = (e) => {
    setCurrentName(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setcurrentDescription(e.target.value);
  };

  const commentChangeHandler = (e) => {
    setcurrentComment(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const nextId = id+1;
    const c = {
      id: nextId,
      name: currentName,
      description: currentDescription,
      comment: currentComment
    };
    setId(nextId);
    setComments((prevState) => {
      return [c,...prevState];
    });
    setCurrentName('');
    setcurrentDescription('');
    setcurrentComment('');
  };

  const deleteComment = (id) => {
    let currentCommentList = comments;
    let filtered = currentCommentList.filter((c, index, arr) => {
      return c.id !== id;
    });
    setComments(filtered);
  };

  const resetForm = () => {
    setCurrentName('');
    setcurrentDescription('');
    setcurrentComment('');
  };

  const openPopup = (id) => {
    let currentCommentList = comments;
    let filtered = currentCommentList.find((c, index, arr) => {
      return c.id === id;
    });
    setSelectedComment(filtered);
    setShowPopup((prevState)=>{
      return !prevState;
    });
  }

  const closePopup = () => {
    setSelectedComment({});
    setShowPopup((prevState)=>{
      return !prevState;
    });
  }

  return (
    <div>
      <div className="inputForm">
        <form onSubmit={submitHandler}>
          <div className="formContainer">
            <div className="ipt md3">
              <label>Name</label>
              <input type="text" value={currentName} onChange={nameChangeHandler}></input>
            </div>
            <div className="ipt md6">
              <label>Description</label>
              <input type="text" value={currentDescription} onChange={descriptionChangeHandler}></input>
            </div>
            <div className="ipt md9">
              <label>Comment</label>
              <input type="text" value={currentComment} onChange={commentChangeHandler}></input>
            </div>
            <div className="md9 ar">
              <button className="main" type="reset" onClick={resetForm}>Clear</button>
              <button className="main" type="submit">Add</button>
            </div>
          </div>
        </form>
      </div>
      <div className="displayTable">
        <table>
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Description
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment)=>(
              <tr key={comment.id}>
                <td>{comment.name}</td>
                <td>{comment.description}</td>
                <td>
                  <div className="md9 ar">
                    <button className="main" type="submit" onClick={() => {deleteComment(comment.id)}}>Delete</button>
                    <button className="main" type="submit" onClick={() => {openPopup(comment.id)}}>Details</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup ?
        <div className='popup'>
          <div className='popup_inner'>
            <div className='closeButton'>
              <button type='button' onClick={closePopup}>X</button>
            </div>
            <div className="displayTable">
              <table>
                <thead>
                  <tr>
                    <th>
                      Name
                    </th>
                    <th>
                      Description
                    </th>
                    <th>
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody>
                <tr key={selectedComment.id}>
                      <td>{selectedComment.name}</td>
                      <td>{selectedComment.description}</td>
                      <td>{selectedComment.comment}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>  : null 
      }
    </div>
  );
}

export default App;
