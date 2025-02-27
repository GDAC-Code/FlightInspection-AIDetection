# -*- coding:utf-8 -*-

from ultralytics import YOLO

if __name__ == "__main__":
    # Load a model
    model = YOLO('./runs/detect/train/weights/best.pt')
    # Run batched inference on a list of images
    model(r"./VOCData\AircraftSurfaceDefect Dataset\images\6_4.png", save=True, device=0)
