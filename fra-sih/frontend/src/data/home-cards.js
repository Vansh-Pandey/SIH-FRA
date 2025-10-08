import React from "react";

const cards = [
  {
    description: "FRA Atlas Dashboard",
    title: "Centralized Data Hub",
    src: "/centralised-data-hub.png",
    ctaText: "Open",
    ctaLink: "/dashboard",
    content: () =>
      React.createElement(
        "p",
        null,
        "The ",
        React.createElement("b", null, "centralized dashboard"),
        " provides a bird’s-eye view of all data collected under the Forest Rights Act. It shows real-time analytics, trends, and reports in an easy-to-understand format, ensuring transparency and accessibility."
      ),
  },
  {
    description: "Claim Management",
    title: "Track & Verify Claims",
    src: "/track-verify.png",
    ctaText: "Manage",
    ctaLink: "/dss",
    content: () =>
      React.createElement(
        "p",
        null,
        "A robust ",
        React.createElement("b", null, "claims management system"),
        " where users can submit, track, and verify claims under the FRA. Integrated with geo-tagging and document uploads, it streamlines the entire verification process."
      ),
  },
  {
    description: "GIS Integration",
    title: "Interactive Map System",
    src: "/fra-map.png",
    ctaText: "Explore",
    ctaLink: "/atlas",
    content: () =>
      React.createElement(
        "p",
        null,
        "FRA Atlas comes with a ",
        React.createElement("b", null, "GIS-based mapping module"),
        ", allowing users to visualize claims, land distribution, and forest areas. Interactive maps make it easier for authorities to validate data spatially."
      ),
  },
];

export default cards;
