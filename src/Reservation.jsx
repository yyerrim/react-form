import { useState } from "react";

// PDF 7.10 / 7.11
function Reservation(props) {
    const [haveBreakfast, setHaveBreakfast] = useState(true);
    const [numberOfGuest, setNumberOfGuest] = useState(2);
    const handleSubmit = (event) => {
        alert(`아침식사 여부: ${haveBreakfast}, 방문객 수: ${numberOfGuest}`);
        event.preventDefault();
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                아침식사 여부:
                <input
                    type="checkbox"
                    checked={haveBreakfast}
                    onChange={(event) => {
                        setHaveBreakfast(event.target.checked)
                    }} />
            </label>
            <br />
            <label>
                방문객 수:
                <input
                    type="number"
                    value={numberOfGuest}
                    onChange={(event) => {
                        setNumberOfGuest(event.target.value);
                    }} />
            </label>
            <button type="submit">제출</button>
        </form>
    )
}

export default Reservation;
// export default를 적지 않고 function 앞에 export 적어주면 Reservation을 import 할 때 중괄호 사용 가능
// ===> 파일 1개에서 여러개 요소들을 뱉어내고 싶을때 사용