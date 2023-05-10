import './sidebarFilter.css';
import {useProduct} from "contexts/index";

const SidebarFilter = ({mobileFilterState, setFilterState}) => {
    const { state: {categories, priceRange, products, starRating, sortBy}, dispatch }  = useProduct();
    const stars = [4,3,2];

    const changeHandler = (filterType, filterValue, e) => {
        const type = filterType; 
        const payload = 
        filterType === 'CATEOGRY' 
            ? { [filterValue]: e.target.checked }
            : filterValue;
        dispatch({type : type, payload: payload}); 
    }
    const isStarRatingChecked = (star) => starRating && starRating === star
    const isSortbyChecked = sortOption => sortBy && sortBy === sortOption ? true : false
    
    return (
        <div className={`product-sidebar mr-6 ${mobileFilterState ? 'active' : ''}`}>
            <aside className="side-navbar">
                <header className="nav-header">
                    <div className="px-4 bold">Filters</div>
                    <p className="link-text-primary px-6"
                    onClick = {() => changeHandler("CLEAR", products)}>Clear</p>
                    <button 
                        className='fas fa-times filter-close-btn' 
                        onClick={() => setFilterState(false)}></button>
                </header>
                <div className="side-navbar">
                    <div className="price-filter">
                        <div className="list-title px-4 my-2 bold">Price</div>
                        <div className="slider list-item px-4">
                            <div className="range w-full">
                            <datalist id="tickmarks">
                                <option value="300" label="300"></option>
                                <option value="1200" label="1200"></option>
                            </datalist>
                            <input 
                                className="rangeInput"
                                type="range" 
                                id="price" 
                                name="price"
                                min="300" 
                                max="1299"
                                value={priceRange}
                                onChange={(e) =>  changeHandler('PRICE', e.target.value)}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="rating-filter">
                        <div className="list-title px-4 my-2 bold">Rating</div>
                        <div className="checklist">
                            {stars.map(star => {
                                return(
                                    <label className="list-item" htmlFor={`rating${star}`} key={star}>
                                    <input
                                        className="mr-4"
                                        type="radio"
                                        id={`rating${star}`}
                                        name='rating'
                                        checked={isStarRatingChecked(star)}
                                        onChange= {() => changeHandler('STAR_RATING', star)}
                                    />
                                   {`${star} stars & above`}
                                </label>
                                )
                            })}
                        </div>
                    </div>
                    <div className="category-filter">
                        <div className="list-title px-4 my-2 bold">Cateogry</div>
                        <div className="checklist">
                            {Object.entries(categories).map(item =>{ 
                                const [categoryName, isChecked] = item;
                                return(
                                    <label key={categoryName} className="list-item" htmlFor={categoryName}>
                                    <input
                                        className="mr-4"
                                        type="checkbox"
                                        id={categoryName}
                                        name={categoryName}
                                        checked={isChecked}
                                        onChange={(e) => changeHandler("CATEOGRY", categoryName, e)}
                                    />
                                    {categoryName}
                                </label>
                                )
                            })}
                        </div>
                    </div>
                    <div className="sort-filter">
                        <div className="checklist">
                            <div className="list-title px-4 my-2 bold">Sort by</div>
                            <label className="list-item" htmlFor="highToLow">
                                <input
                                    className="mr-4"
                                    type="radio"
                                    id="highToLow"
                                    name="radioBtn"
                                    checked={isSortbyChecked('lowtoHigh')}
                                    onChange={() => changeHandler('LOW_TO_HIGH')}
                                />
                                 Low to High
                            </label>
                            <label className="list-item" htmlFor="lowToHigh">
                                <input
                                    className="mr-4"
                                    type="radio"
                                    id="lowToHigh"
                                    name="radioBtn"
                                    checked={isSortbyChecked('hightoLow')}
                                    onChange={() => changeHandler('HIGH_TO_LOW')}
                                />
                                High to Low
                            </label>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}
export {SidebarFilter};