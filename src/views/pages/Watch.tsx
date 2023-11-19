import { VideoPlayer } from "@views/components/VideoPlayer";

export const Watch = () => {
  return (
    <>
      <div className="container" style={{ marginTop: "55px" }}>
        <br />
        <VideoPlayer />
      </div>
      <div
        className="container content-wrappers"
        style={{ display: "flex", margin: "38px 80px", gap: "50px" }}
      >
        <section style={{ width: "700px" }}>
          <h4 className="text-light">Spy x Family | EP 01</h4>
          <h5 className="text-gray">Operation Strix</h5>
          <br />
          <h6 className="text-gray">
            Twilight is an agent that works htmlFor WISE, Westalis's
            intelligence agency, and he is tasked with investigating Desmond,
            who is in Ostania and planning to start a war. Twilight disguises
            himself as the psychiatrist Loid htmlForger and adopts a girl named
            Anya so that he can enroll her into the prestigious Eden College to
            get closer to his target. Unbeknownst to him, Anya is actually a
            telepath who can read people's minds. One day, members of a mafia
            group that is after Twilight kidnaps Anya. Loid realizes that he
            needs to reconsider his priorities and...
          </h6>
          <br /><br />
          <h4>Downloads</h4>
        </section>
        <section>
          <h4>Next Episode</h4>
          <div className="d-flex flex-column flex-md-row gap-4 py-md-5 align-items-center justify-content-center">
            <div className="list-group list-group-checkable d-grid gap-2 border-0">
              <label
                className="list-group-item rounded-3 py-3"
                htmlFor="listGroupCheckableRadios1"
              >
                First radio
                <span className="d-block small opacity-50">
                  With support text underneath to add more detail
                </span>
              </label>
              <label
                className="list-group-item rounded-3 py-3"
                htmlFor="listGroupCheckableRadios2"
              >
                Second radio
                <span className="d-block small opacity-50">
                  Some other text goes here
                </span>
              </label>
              <label
                className="list-group-item rounded-3 py-3"
                htmlFor="listGroupCheckableRadios3"
              >
                Third radio
                <span className="d-block small opacity-50">
                  And we end with another snippet of text
                </span>
              </label>
              <label
                className="list-group-item rounded-3 py-3"
                htmlFor="listGroupCheckableRadios4"
              >
                Fourth disabled radio
                <span className="d-block small opacity-50">
                  This option is disabled
                </span>
              </label>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
