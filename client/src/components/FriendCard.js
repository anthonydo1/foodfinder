import ReactRoundedImage from 'react-rounded-image';

function FriendCard(props) {

    return (
        <div className="shadow card mb-2 mr-4">
            <div className="card-body">
                <div className="row">
                    <div className="col text-center">
                        <ReactRoundedImage
                            image="https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
                            roundedColor="#64b5f6"
                            imageWidth="100"
                            imageHeight="100"
                            roundedSize="6"
                            hoverColor="#bbdefb"
                        />
                        <h4 className="card-title">{props.first_name} {props.last_name}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{props.username}</h6>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FriendCard;