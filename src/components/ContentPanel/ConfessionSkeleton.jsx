import React from "react";

const ConfessionSkeleton = props => (
  <div className="skeleton">
    <div className="skeleton__avatar" />
    <div className="skeleton__author" />
    <div className="skeleton__confession_line__1" />
    <div className="skeleton__confession_line__2" />
    <div className="skeleton__tag__1" />
    <div className="skeleton__tag__2" />
    <div className="skeleton__divider" />
    <div className="skeleton__icons__like" />
    <div className="skeleton__icons__dislike" />
    <div className="skeleton__icons__comments" />
    <div className="skeleton__reply" />
  </div>
);

export default ConfessionSkeleton;
