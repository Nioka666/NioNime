import { ButtonOne } from "./Button"

export const CommentInfo = () => {
    return (
        <>
            <div
                className="py-5 my-5 text-center"
                style={{
                    width: "690px",
                    border: "3px solid #4c4c4c",
                    borderStyle: "dashed",
                    margin: "0 auto",
                }}
            >
                <div className="col-lg-6 mx-auto w-100">
                    <p className="lead mb-4">
                        Oops sorry, Comment sections <br />
                        will be comings !!
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <ButtonOne>Browse More</ButtonOne>
                    </div>
                </div>
            </div>
        </>
    )
}