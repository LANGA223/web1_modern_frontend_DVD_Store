import { coverImage, avatarImage } from '../utils/images';

const team = [
    { name: 'Samart Vattanak Sakseth', role: 'Founder & CEO' },
    { name: 'Khorn Lida', role: 'CFO' },
    { name: 'Va Soksin', role: 'Operations Manager' },
    { name: 'Ly Tinghai', role: 'CTO' },
    { name: 'Kreang Chanla', role: 'COO' },
    
];

export default function About() {
    return (
        <main className="flex-shrink-0">
            {/* Navigation*/}

            {/* Header*/}
            <header className="py-5">
                <div className="container px-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-xxl-6">
                            <div className="text-center my-5">
                                <h1 className="fw-bolder mb-3">
                                    Our mission is to give you the best watching experience as possible.
                                </h1>
                                <p className="lead fw-normal text-muted mb-4">
                                    We believe that true cinema belongs in your hands, not hidden behind a paywall or subjected to an internet connection. The digital streaming era sells a license that can be revoked or altered overnight. We deal in physical media. We believe in the satisfying snap of a case opening, the physical weight of a growing collection on your shelf, and the absolute certainty that your favorite movies is always ready to play.
                                </p>
                                <a className="btn btn-primary btn-lg" href="#scroll-target">
                                    Read our story
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* About section one*/}
            <section className="py-5 bg-light" id="scroll-target">
                <div className="container px-5 my-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6">
                            <img
                                className="img-fluid rounded mb-5 mb-lg-0"
                                src={coverImage('Our founding', 'founding')}
                                alt="Our founding"
                            />
                        </div>
                        <div className="col-lg-6">
                            <h2 className="fw-bolder">Our founding</h2>
                            <p className="lead fw-normal text-muted mb-0">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto est,
                                ut esse a labore aliquam beatae expedita. Blanditiis impedit numquam
                                libero molestiae et fugit cupiditate, quibusdam expedita, maiores
                                eaque quisquam.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* About section two*/}
            <section className="py-5">
                <div className="container px-5 my-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6 order-first order-lg-last">
                            <img
                                className="img-fluid rounded mb-5 mb-lg-0"
                                src={coverImage('Growth & beyond', 'growth')}
                                alt="Growth and beyond"
                            />
                        </div>
                        <div className="col-lg-6">
                            <h2 className="fw-bolder">Growth &amp; beyond</h2>
                            <p className="lead fw-normal text-muted mb-0">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto est,
                                ut esse a labore aliquam beatae expedita. Blanditiis impedit numquam
                                libero molestiae et fugit cupiditate, quibusdam expedita, maiores
                                eaque quisquam.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Team members section*/}
            <section className="py-5 bg-light">
                <div className="container px-5 my-5">
                    <div className="text-center">
                        <h2 className="fw-bolder">Our team</h2>
                        <p className="lead fw-normal text-muted mb-5">
                            Dedicated to quality and your success
                        </p>
                    </div>
                    <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
                        {team.map((member) => (
                            <div className="col mb-5" key={member.name}>
                                <div className="text-center">
                                    <img
                                        className="img-fluid rounded-circle mb-4 px-4"
                                        src={avatarImage(member.name)}
                                        alt={member.name}
                                    />
                                    <h5 className="fw-bolder">{member.name}</h5>
                                    <div className="fst-italic text-muted">{member.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>

    );
}