
import { useEffect, useState } from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';
import './App.css';

export default function App() {

  const [itemList, setItemList] = useState([]);
  // const [itemTags, setItemTags] = useState([
  //   {
  //     name: 'Opportunity Knocks',
  //     tags: ['one', 'two']
  //   },
  //   {
  //     name: 'Jimmy and Judy',
  //     tags: ['one']
  //   },
  // ]);
  const [itemTags, setItemTags] = useState([]);
  const [activeItem, setActiveItem] = useState([]);


  useEffect(() => {
    fetch('https://my.api.mockaroo.com/movies.json?key=bf3c1c60', 
    {
      method: "GET",
    }
  )
    .then(res => res.json())
    .then(res => {
      const sortedList = res.sort((a,b) => (a.id > b.id) ? 1 : -1);

      setItemList(sortedList);
      
      //console.log(sortedList);
    })
    .catch(err => console.error(err));

  }, []);

  const handleAddTag = (e) => {
    e.preventDefault();
    // get tag value, and item name
    const tag = e.target[0].value;
    const itemName = e.target.dataset.name;

      console.log(itemTags + '....');
      console.log(itemName);
    // check if item with name exists in itemTags array
    if (itemTags.some((item) => item.name === itemName)) {
      // console.log('item already exists..');

      // if exists, spread new tag into existing tags array
      const updatedItemTags = itemTags.map((item) => {
        if (item.name === itemName) {
          console.log({ ...item, tags: [...item.tags, tag]});
          return { ...item, tags: [...item.tags, tag]}
        } 
      });
      // update state - MAKE FUNCTION THAT TAKES UPDATED, AND SETS STATE AND LOCAL STORAGE?

      // update itemTags state
      setItemTags(updatedItemTags);

    } else {
      console.log('new item added..');
      // add new object to itemTags array, with name and tag
      const newTags = [
        ...itemTags,
        { name: itemName, tags: [tag] }
      ];
      // update state
      setItemTags(newTags);
    }

    console.log(itemTags);
    // localStorage.setItem('itemTags', JSON.stringify(itemTags));

    // var test = localStorage.getItem('itemTags');
    // console.log(test);

    // console.log(JSON.parse(test));

    // console.log(itemTags);

    // localStorage.setItem(
    //   itemName,
    //   {
    //     name: itemName,
    //     tags: tag
    //   }
    // );

    //consoleLog();

  }

  // const consoleLog = () => {
  //   console.log(itemTags);
  // }

  const storedItems = (itemName) => {
    // if (localStorage.getItem(itemName) !== null) {
    //   //console.log(localStorage.getItem('Opportunity Knocks'));
    // }

    console.log(itemName);

    // if theres stored tags
    if (itemTags.length > 0) {
      // if theres stored tags with name
      // console.log('theres tags: ' + itemName);
      // let foundTags = itemTags.filter((item => item.name === itemName));

      // if (foundTags.length > 0) {
      //   // let tagsArray = foundTags[0].tags;
      //   console.log('found tags..');
      //   console.log(foundTags);
      //   // if (tagsArray) {
      //   // //   console.log(itemTags);
      //   // //   const tagOutput = tagsArray.map((tag) =>
      //   // //       <li key={tag}>{tag}</li>
      //   // //   );
      //   // //   return tagOutput;

      //   // }
      // } 

      // if (itemTags.some(item => item.name === itemName)) {
      //   const tagOutput = item.tags.map((tag) =>
      //     <li key={tag}>{tag}</li>
      // );
      // return tagOutput;
      // }
    } else {
      // console.log('no itemTags..');
    }
  }



  return (
    <div className="App">
      <header>
        Search
      </header>
      <main>
        <div className="item-list">
          
            {/* {itemList.map((item) => (
              <div className="item" key={item.id}>
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-date">{item.created_at}</p>
                </div>
                <div className="tags">

                </div>
                <form className="tag-form" onSubmit={handleAddTag}>
                  <input className="tag-input" type="text" />
                  <button>Add Tag</button>
                </form>
              </div>
            ))} */}

              {/* <div className="item">
                <div className="item-info">
                  <h3 className="item-name">Jimmy and Judy</h3>
                  <p className="item-date">2020-05-27 15:11:38</p>
                </div>
                <div className="tags">
                {storedItems('Jimmy and Judy')}
                </div>
                <form className="tag-form" onSubmit={handleAddTag} data-name="Jimmy and Judy">
                  <input className="tag-input" type="text" />
                  <button data-name="Jimmy and Judy">Add Tag</button>
                </form>
              </div> */}

              <div className="item">
                <div className="item-info">
                  <h3 className="item-name">Opportunity Knocks</h3>
                  <p className="item-date">2020-06-26 11:17:40</p>
                </div>
                <ul className="tags">
              
                  {storedItems('Opportunity Knocks')}
                  
                </ul>
                <form className="tag-form" onSubmit={handleAddTag} data-name="Opportunity Knocks">
                  <input className="tag-input" type="text" />
                  <button data-name="Opportunity Knocks">Add Tag</button>
                </form>
              </div>

              <div className="item">
                <div className="item-info">
                  <h3 className="item-name">Jimmy and Judy</h3>
                  <p className="item-date">2020-05-27 15:11:38</p>
                </div>
                <div className="tags">
                  {storedItems('Jimmy and Judy')}
                
                </div>
                <form className="tag-form" onSubmit={handleAddTag} data-name="Jimmy and Judy">
                  <input className="tag-input" type="text" />
                  <button data-name="Jimmy and Judy">Add Tag</button>
                </form>
              </div>

          
        </div>
      </main>
    </div>
  );
}


