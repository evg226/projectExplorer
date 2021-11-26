import { Col, Image, Card } from "react-bootstrap"
import  {useNavigate}  from "react-router-dom";
import { PROJECT_ROUTE } from "../utils/constants";
import {baseURL} from "../utils/constants";
export const ProjectItem = ({item}) => {
    const navigate = useNavigate();
    return (
        <Col xs={6} sm={6} md={4} lg={"auto"}  onClick ={()=>navigate(`${PROJECT_ROUTE}/${item.id}`)}>
            <Card
                className="mb-3"
                style={{ width: 200, cursor: "pointer" }}
                border="light"
            >
                <Image width={200} height={200} src={baseURL+item.icon} alt={"image "+item.name} />
                <div className="d-flex justify-content-between mt-2 text-black-50">
                    <div >
                        {item.type.name}
                    </div>
                    <div>
                        <Image width={25} src="star.png" />
                        {item.rating}
                    </div>
                </div>
                 <div>
                    {item.name}                                    
                </div>
                
            </Card>
        </Col>
    )
}