package com.QTcsdl.pixel_arena.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.QTcsdl.pixel_arena.Model.Pixel;
import com.QTcsdl.pixel_arena.Repository.PixelRepository;
import com.QTcsdl.pixel_arena.Service.PixelService;
import com.QTcsdl.pixel_arena.dto.PixelRequest;


@RestController
@RequestMapping("/api/pixels")
@CrossOrigin(origins = "*") //cho phép tất cả các domain truy cập API
public class PixelController {

    @Autowired
    private PixelRepository pixelRepository;

    @Autowired
    private PixelService pixelService;

    @GetMapping
    public List<Pixel> getAllPixels(){
        return pixelRepository.findAll().stream().limit(100).toList();
    }

    // API TÔ MÀU CHÍNH
    @PostMapping("/paint")
    public Pixel paintPixel(@RequestBody PixelRequest request) {
        switch (request.getMode()) {
            case "PESSIMISTIC":
                System.out.println("Dang chay che do: PESSIMISTIC LOCK");
                return pixelService.paintPessimistic(request);
            case "OPTIMISTIC":
                System.out.println("Dang chay che do: OPTIMISTIC LOCK");
                return pixelService.paintOptimistic(request);
            default:
                System.out.println("Dang chay che do: NO LOCK (Se co loi)");
                return pixelService.paintNoLock(request);
        }
    }
}
