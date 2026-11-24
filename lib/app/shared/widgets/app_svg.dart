import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';

/// A Figma-exported SVG drawn at a fixed box size. A `.png` path is drawn
/// as a bitmap in the same box, so icon slots can take either.
class AppSvg extends StatelessWidget {
  const AppSvg(this.asset, {super.key, required this.size, this.height, this.color});

  final String asset;

  /// Width — and height too, unless [height] is given.
  final double size;
  final double? height;

  /// Repaints every visible part of a single-colour icon in this colour.
  /// Null keeps the colours from the file.
  final Color? color;

  @override
  Widget build(BuildContext context) => asset.endsWith('.png')
      ? Image.asset(asset, width: size, height: height ?? size, fit: BoxFit.contain, color: color)
      : SvgPicture.asset(
        asset,
        width: size,
        height: height ?? size,
        fit: BoxFit.contain,
        colorFilter: color == null ? null : ColorFilter.mode(color!, BlendMode.srcIn),
      );
}
