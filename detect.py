# -*- coding:utf-8 -*-
# @author: 牧锦程
# @微信公众号: AI算法与电子竞赛
# @Email: m21z50c71@163.com
# @VX：fylaicai

from ultralytics import YOLO

if __name__ == "__main__":
    # Load a model
    model = YOLO('./runs/detect/train/weights/best.pt')
    # Run batched inference on a list of images
    model(r"./VOCData\AircraftSurfaceDefect Dataset\images\6_4.png", save=True, device=0)
