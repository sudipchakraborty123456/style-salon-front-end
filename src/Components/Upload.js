const React = require('react')
class Upload extends React.Component {
    fileObj = [];
    fileArray = [];
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            uploadChanged: false
        }

    }


    uploadMultipleFiles = (e) => {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({
            file: this.fileArray,
            uploadChanged: true
        })
    }

    render() {
        return (
            <div className="container">
                <form action="/profile" method="post" enctype="multipart/form-data">
                <div className="" >
                    <input type="file" multiple onChange={this.uploadMultipleFiles} />
                    <button className="btn">Submit</button>
                    {
                        this.state.uploadChanged == true ?

                            <h4 className="text-center">Preview</h4>

                            :
                            <h4></h4>


                    }

                    <div className="form-group multi-preview">

                        {(this.fileArray || []).map(url => (
                            <img className="col-4 m-3" src={url} alt="..." height="200px" width="200px" />
                        ))}
                    </div>

                </div>
                </form>
            </div >
        );
    }
}
export default Upload;