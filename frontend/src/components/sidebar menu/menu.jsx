import Sidebar from "../sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Menu() {
    // State for storing the menu items
    const [starters, setStarters] = useState([]);
    const [mainCourse, setMainCourse] = useState([]);
    const [beverages, setBeverages] = useState([]);


    useEffect(() => {
        // Simulate fetching data from the backend
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/menu"); // Replace with your API endpoint
            const data = await response.json();

            // Add quantity = 0 to each item
            const updatedData = data.map((item) => ({
                ...item,
                quantity: 0, // Add default quantity
                image: item.dish_image || "/sklton_img.png",
            }));
            console.log(updatedData)
            const startersData = updatedData.filter(item => item.category_id === 2);
            const mainCourseData = updatedData.filter(item => item.category_id === 3);
          const beveragesData = updatedData.filter(item => item.category_id === 4);
          
          setStarters(startersData);
          setMainCourse(mainCourseData);
          setBeverages(beveragesData);
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    function addMenu() {
        navigate('/addmenu');
    }

    const [isEditing, setIsEditing] = useState(false);

    function onClickEdit() {
        setIsEditing(true);
    }

    function onClickSave() {
        setIsEditing(false); // Show Edit button again
    }

    // Handle delete (for now, just logging the index)
    function handleDelete(index) {
        console.log(`Delete dish at index: ${index}`);
    }

    return (
        <>
            <Sidebar />
            <div className="menu-container">
                <div className="section">
                    <h2>Starters</h2>
                    <div className="menu-items">
                    {starters.map((item) => (
                            <div className="dish-card" key={item.dish_id}>
                                <img src={item.image} alt={item.dish_name} />
                                <div className="dish-info">
                                    <h3 className="dish-name">{item.dish_name}</h3>
                                    <p className="dish-desc">{item.dish_description || 'No Description'}</p>
                                    <p className="dish-price">₹ {item.dish_cost}</p>
                                </div>
                                {/* Delete button (img) */}
                                <img
                                    src="/menu-imgs/delete.svg"
                                    alt="Delete"
                                    className="delete-btn"
                                    onClick={() => handleDelete(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section">
                    <h2>Main Course</h2>
                    <div className="menu-items">
                        {mainCourse.map((dish) => (
                            <div className="dish-card" key={dish.dish_id}>
                                <img src={dish.image} alt={dish.dish_name} />
                                <div className="dish-info">
                                    <h3 className="dish-name">{dish.dish_name}</h3>
                                    <p className="dish-desc">{dish.dish_description}</p>
                                    <p className="dish-price">₹ {dish.dish_cost}</p>
                                </div>
                                {/* Delete button (img) */}
                                <img
                                    src="/menu-imgs/delete.svg"
                                    alt="Delete"
                                    className="delete-btn"
                                    onClick={() => handleDelete(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section">
                    <h2>Beverages</h2>
                    <div className="menu-items">
                        {beverages.map((dish) => (
                            <div className="dish-card" key={dish.dish_id}>
                                <img src={dish.image} alt={dish.dish_name} />
                                <div className="dish-info">
                                    <h3 className="dish-name">{dish.dish_name}</h3>
                                    <p className="dish-desc">{dish.dish_description}</p>
                                    <p className="dish-price">₹ {dish.dish_cost}</p>
                                </div>
                                {/* Delete button (img) */}
                                <img
                                    src="/menu-imgs/delete.svg"
                                    alt="Delete"
                                    className="delete-btn"
                                    onClick={() => handleDelete(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {isEditing ? (
                    <div className="edit-menu-btns">
                        <div className="live-all-menu">
                            <button className="live-all-btn">Live All</button>
                        </div>
                        <div className="save-menu">
                            <button className="save-btn" onClick={onClickSave}>Save</button>
                        </div>
                    </div>
                ) : (
                    <button className="edit-button" onClick={onClickEdit}>Edit</button>
                )}
                <button className="add-dish-button" onClick={addMenu}>+ Add Dish</button>
            </div>
        </>
    );
}

export default Menu;
